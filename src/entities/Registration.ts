import type { Language } from '@/lib/i18n/types';

export interface RegistrationData {
  full_name: string;
  email: string;
  country: string;
  job_title: string;
  company?: string;
  interests?: string[];
  language?: Language;
  ticket_id?: string;
}

export const RegistrationSchema = {
  name: "Registration",
  type: "object",
  properties: {
    full_name: {
      type: "string",
      description: "Full name of the registrant"
    },
    email: {
      type: "string",
      format: "email",
      description: "Email address"
    },
    country: {
      type: "string",
      description: "Country of residence"
    },
    job_title: {
      type: "string",
      description: "Job title"
    },
    company: {
      type: "string",
      description: "Company name"
    },
    interests: {
      type: "array",
      items: {
        type: "string"
      },
      description: "Fields of interest"
    },
    language: {
      type: "string",
      enum: ["en", "he"],
      default: "en",
      description: "Preferred language"
    },
    ticket_id: {
      type: "string",
      description: "Generated ticket ID"
    }
  },
  required: ["full_name", "email", "country", "job_title"]
} as const;

export class Registration {
  private readonly data: RegistrationData;

  private constructor(data: RegistrationData) {
    this.data = data;
  }

  static create(data: Partial<RegistrationData>): Registration {
    // Validate required fields
    const requiredFields = RegistrationSchema.required;
    const missingFields = requiredFields.filter(field => !data[field]);

    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email!)) {
      throw new Error('Invalid email format');
    }

    // Validate language if provided
    if (data.language && !RegistrationSchema.properties.language.enum.includes(data.language)) {
      throw new Error(`Invalid language. Must be one of: ${RegistrationSchema.properties.language.enum.join(', ')}`);
    }

    // Set default values
    const registrationData: RegistrationData = {
      full_name: data.full_name!,
      email: data.email!,
      country: data.country!,
      job_title: data.job_title!,
      company: data.company,
      interests: data.interests || [],
      language: data.language || RegistrationSchema.properties.language.default,
      ticket_id: data.ticket_id || this.generateTicketId()
    };

    return new Registration(registrationData);
  }

  private static generateTicketId(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    return `DC-${timestamp}-${random}`.toUpperCase();
  }

  // Getters
  get fullName(): string {
    return this.data.full_name;
  }

  get email(): string {
    return this.data.email;
  }

  get country(): string {
    return this.data.country;
  }

  get jobTitle(): string {
    return this.data.job_title;
  }

  get company(): string | undefined {
    return this.data.company;
  }

  get interests(): string[] {
    return this.data.interests || [];
  }

  get language(): Language {
    return this.data.language || 'en';
  }

  get ticketId(): string {
    return this.data.ticket_id || '';
  }

  // Get field description
  getFieldDescription(field: keyof RegistrationData): string {
    return RegistrationSchema.properties[field]?.description || '';
  }

  // Get schema
  static getSchema() {
    return RegistrationSchema;
  }

  // Convert to plain object
  toJSON(): RegistrationData {
    return { ...this.data };
  }

  // Convert to string
  toString(): string {
    return JSON.stringify(this.data);
  }
}