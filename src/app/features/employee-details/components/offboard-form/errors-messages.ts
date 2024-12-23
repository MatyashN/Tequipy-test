export const errorMessages: { [key: string]: { [error: string]: string } } = {
  receiver: {
    required: 'Receiver name is required.',
    minlength: 'Receiver name must be at least 3 characters long.',
    maxlength: 'Receiver name cannot exceed 50 characters.',
    pattern: 'Receiver name can only contain letters and spaces.'
  },
  email: {
    required: 'Email is required.',
    email: 'Please enter a valid email address.'
  },
  phone: {
    required: 'Phone number is required.',
    pattern: 'Phone number must be in the format: +123456789 or 123456789.'
  },
  streetLine: {
    required: 'Address is required.',
    minlength: 'Address must be at least 5 characters long.',
    maxlength: 'Address cannot exceed 100 characters.',
    pattern: 'Address can only contain letters, numbers, spaces, commas, periods, and hyphens.'
  },
  city: {
    required: 'City is required.',
    minlength: 'At least 2 characters long.',
    maxlength: 'Can not exceed 50 characters.',
    pattern: 'Can only contain letters.'
  },
  postalCode: {
    required: 'Postal code is required.',
    pattern: 'Must contain 5 to 10 digits.'
  },
  country: {
    required: 'Country is required.',
    minlength: 'Country name must be at least 2 characters long.',
    maxlength: 'Country name cannot exceed 50 characters.',
    pattern: 'Country name can only contain letters and spaces.'
  },
  notes: {
    maxlength: 'Notes cannot exceed 200 characters.',
    pattern: 'Notes can only contain letters, numbers, spaces, commas, periods, and hyphens.'
  }
};
