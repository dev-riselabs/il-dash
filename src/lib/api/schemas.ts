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
  phone: z.string()
    .min(1, 'Phone is required')
    .min(10, 'Phone must be at least 10 digits'),
  nationality: z.string()
    .min(1, 'Nationality is required'),
  category: z.string()
    .min(1, 'Category is required'),
  date_of_birth: z.string().optional(),
})

export const speakerSchema = z.object({
  first_name: z.string()
    .min(1, 'First name is required')
    .min(2, 'First name must be at least 2 characters'),
  last_name: z.string()
    .min(1, 'Last name is required')
    .min(2, 'Last name must be at least 2 characters'),
  email: z.string()
    .min(1, 'Email is required')
    .email('Invalid email address'),
  title: z.string()
    .min(1, 'Title is required')
    .min(2, 'Title must be at least 2 characters'),
  bio: z.string()
    .min(1, 'Bio is required')
    .min(10, 'Bio must be at least 10 characters')
    .max(500, 'Bio must be less than 500 characters'),
})

export const sessionSchema = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .min(5, 'Title must be at least 5 characters'),
  description: z.string()
    .min(1, 'Description is required')
    .min(20, 'Description must be at least 20 characters'),
  track_id: z.string()
    .min(1, 'Track is required'),
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
  comment: z.string()
    .min(1, 'Comment is required')
    .min(10, 'Comment must be at least 10 characters')
    .max(500, 'Comment cannot exceed 500 characters'),
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
export type FeedbackFormData = z.infer<typeof feedbackSchema>
export type AdminSignupFormData = z.infer<typeof adminSignupSchema>
export type UserCreateFormData = z.infer<typeof userCreateSchema>
export type UserEditFormData = z.infer<typeof userEditSchema>
