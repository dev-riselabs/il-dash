import { z } from 'zod'

export const attendeeSchema = z.object({
  first_name: z.string()
    .min(1, 'First name is required')
    .min(2, 'First name must be at least 2 characters'),
  last_name: z.string()
    .min(1, 'Last name is required')
    .min(2, 'Last name must be at least 2 characters'),
  email: z.string()
    .min(1, 'Email is required')
    .email('Invalid email address'),
  job_title: z.string().optional(),
  organization: z.string().optional(),
  country: z.string().optional(),
  region: z.string().optional(),
  gender: z.enum(['male', 'female', 'other']).optional(),
  category: z.string().optional(),
  event_id: z.string().optional(),
  track_id: z.string().optional(),
  sector_id: z.string().optional(),
})

export const speakerSchema = z.object({
  first_name: z.string()
    .min(1, 'First name is required')
    .min(2, 'First name must be at least 2 characters'),
  last_name: z.string()
    .min(1, 'Last name is required')
    .min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address').optional(),
  job_title: z.string()
    .min(2, 'Job title must be at least 2 characters')
    .optional(),
  organization: z.string()
    .min(2, 'Organization must be at least 2 characters')
    .optional(),
  country: z.string().optional(),
  bio: z.string()
    .min(10, 'Bio must be at least 10 characters')
    .max(500, 'Bio must be less than 500 characters')
    .optional(),
  session_id: z.string().optional(),
  role: z.enum(['keynote', 'panelist', 'moderator']).optional(),
})

export const eventSchema = z.object({
  name: z.string()
    .min(1, 'Event name is required')
    .min(3, 'Event name must be at least 3 characters')
    .max(255, 'Event name must be less than 255 characters'),
  slug: z.string().optional(),
  description: z.string().optional(),
  location: z.string().optional(),
  starts_at: z.string()
    .min(1, 'Start date is required'),
  ends_at: z.string()
    .min(1, 'End date is required'),
  status: z.enum(['upcoming', 'live', 'completed', 'cancelled']).optional(),
}).refine((data) => {
  const start = new Date(data.starts_at)
  const end = new Date(data.ends_at)
  return end > start
}, {
  message: 'End date must be after start date',
  path: ['ends_at'],
})

export const sessionSchema = z.object({
  event_id: z.string()
    .min(1, 'Event is required'),
  title: z.string()
    .min(1, 'Title is required')
    .min(5, 'Title must be at least 5 characters'),
  description: z.string()
    .min(1, 'Description is required')
    .min(20, 'Description must be at least 20 characters'),
  track_id: z.string()
    .min(1, 'Track is required'),
  sector_id: z.string().optional(),
  venue_id: z.string()
    .min(1, 'Venue is required'),
  starts_at: z.string()
    .min(1, 'Start time is required'),
  ends_at: z.string()
    .min(1, 'End time is required'),
}).refine((data) => {
  const start = new Date(data.starts_at)
  const end = new Date(data.ends_at)
  return end > start
}, {
  message: 'End time must be after start time',
  path: ['ends_at'],
})

export const feedbackSchema = z.object({
  session_id: z.string()
    .min(1, 'Session is required'),
  star_rating: z.number()
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating cannot exceed 5'),
  review_text: z.string()
    .min(1, 'Review is required')
    .min(10, 'Review must be at least 10 characters')
    .max(500, 'Review cannot exceed 500 characters'),
  key_takeaway: z.string().optional(),
  sentiment_label: z.enum(['positive', 'neutral', 'negative']).optional(),
})

export const feedbackEditSchema = z.object({
  star_rating: z.union([z.number(), z.string()])
    .refine(val => {
      const num = typeof val === 'string' ? parseInt(val) : val
      return num >= 1 && num <= 5
    }, 'Rating must be between 1 and 5'),
  review_text: z.string().optional(),
  key_takeaway: z.string().optional(),
  sentiment_label: z.enum(['positive', 'neutral', 'negative']).optional(),
})

export const adminSignupSchema = z.object({
  name: z.string()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters'),
  email: z.string()
    .min(1, 'Email is required')
    .email('Invalid email address'),
  password: z.string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters'),
  password_confirmation: z.string()
    .min(1, 'Password confirmation is required'),
  phone: z.string()
    .min(1, 'Phone is required')
    .min(10, 'Phone must be at least 10 digits'),
  role: z.enum(['admin', 'operator'], {
    errorMap: () => ({ message: 'Role must be either admin or operator' })
  }),
}).refine((data) => data.password === data.password_confirmation, {
  message: 'Passwords do not match',
  path: ['password_confirmation'],
})

export const userCreateSchema = z.object({
  name: z.string()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters'),
  email: z.string()
    .min(1, 'Email is required')
    .email('Invalid email address'),
  password: z.string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters'),
  phone: z.string()
    .min(1, 'Phone is required')
    .min(10, 'Phone must be at least 10 digits'),
  role: z.enum(['super_admin', 'admin', 'operator'], {
    errorMap: () => ({ message: 'Invalid role selected' })
  }),
})

export const userEditSchema = z.object({
  name: z.string()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters'),
  phone: z.string()
    .min(1, 'Phone is required')
    .min(10, 'Phone must be at least 10 digits'),
  bio: z.string().optional(),
  password: z.string().optional(),
}).refine((data) => {
  if (data.password && data.password.length < 8) {
    return false
  }
  return true
}, {
  message: 'Password must be at least 8 characters',
  path: ['password'],
})

// Type exports for TypeScript
export type AttendeeFormData = z.infer<typeof attendeeSchema>
export type SpeakerFormData = z.infer<typeof speakerSchema>
export type SessionFormData = z.infer<typeof sessionSchema>
export type EventFormData = z.infer<typeof eventSchema>
export type FeedbackFormData = z.infer<typeof feedbackSchema>
export type AdminSignupFormData = z.infer<typeof adminSignupSchema>
export type UserCreateFormData = z.infer<typeof userCreateSchema>
export type UserEditFormData = z.infer<typeof userEditSchema>

// Demo Request Schema
export const demoRequestSchema = z.object({
  // Section A: Basic Details
  full_name: z.string()
    .min(1, 'Full name is required')
    .min(2, 'Full name must be at least 2 characters')
    .max(255, 'Full name must be less than 255 characters'),
  email: z.string()
    .min(1, 'Email is required')
    .email('Invalid email address'),
  organization: z.string()
    .min(1, 'Organization is required')
    .min(2, 'Organization must be at least 2 characters'),
  job_title: z.string()
    .min(1, 'Job title is required')
    .min(2, 'Job title must be at least 2 characters'),
  phone_number: z.string()
    .min(1, 'Phone number is required')
    .min(10, 'Phone number must be at least 10 characters'),
  country: z.string()
    .min(1, 'Country is required'),

  // Section B: Event Details
  event_type: z.string()
    .min(1, 'Event type is required'),
  event_name: z.string().optional(),
  event_date: z.string()
    .min(1, 'Event date is required'),
  event_location: z.string()
    .min(1, 'Event location is required'),
  estimated_attendees: z.string()
    .min(1, 'Estimated attendees is required'),

  // Section C: Needs & Intent
  primary_objectives: z.array(z.string()).optional(),
  deployment_timeline: z.array(z.string()).optional(),

  // Section D: Budget
  budget_range: z.string().optional(),

  // Section E: Additional Notes
  additional_notes: z.string().optional(),
})

export type DemoRequestFormData = z.infer<typeof demoRequestSchema>

export const dealSchema = z.object({
  title: z.string()
    .min(1, 'Deal title is required')
    .min(3, 'Deal title must be at least 3 characters')
    .max(255, 'Deal title must be less than 255 characters'),
  investor_id: z.string().optional(),
  sector_id: z.string().optional(),
  stage: z.enum(['discussion', 'negotiation', 'commitment', 'closed_won', 'closed_lost']).optional(),
  value_naira: z.string().optional().pipe(
    z.string().transform(val => val === '' ? null : parseInt(val)).nullable()
  ),
  owner_id: z.string().optional(),
})

export type DealFormData = z.infer<typeof dealSchema>

