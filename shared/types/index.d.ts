// shared/types/index.d.ts
export interface Client {
  _id?: string; // Optional: typically assigned by the database
  name: string;
  contactEmail: string;
  industry: string;
  status: 'Lead' | 'Active' | 'Past' | 'On Hold';
  createdAt?: Date;
  updatedAt?: Date;
  // Add other relevant client fields:
  // website?: string;
  // phone?: string;
  // brandGuideId?: string; // Link to BrandGuide model
  // goals?: ClientGoal[];
}

export interface ApiError {
  message: string;
  statusCode?: number;
  errors?: Record<string, string[]>; // For validation errors
}
