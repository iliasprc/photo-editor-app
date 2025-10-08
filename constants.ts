
import { PromptTemplate } from './types';

export const PROMPT_TEMPLATES: PromptTemplate[] = [
  { id: 'product-showcase', name: 'Product Showcase', prompt: 'Place this product on a clean, modern studio background with soft, professional lighting to make it stand out.' },
  { id: 'social-media-ad', name: 'Social Media Ad', prompt: 'Make this image more eye-catching for a social media advertisement. Increase color vibrancy, contrast, and add a sense of dynamic energy.' },
  { id: 'seasonal-sale', name: 'Seasonal Sale', prompt: 'Infuse this image with a seasonal theme (e.g., summer sunshine, autumn leaves, or winter snow) for a promotional sale campaign.' },
  { id: 'luxury-look', name: 'Luxury Vibe', prompt: 'Enhance this image to give it a luxurious, high-end feel. Use deep, rich colors and elegant lighting effects.' },
  { id: 'brand-colors', name: 'Brand Colors', prompt: 'Subtly incorporate our brand\'s primary color into the background or ambient lighting of this image.' },
  { id: 'testimonial-bg', name: 'Testimonial BG', prompt: 'Turn this image into a great background for a customer testimonial. Make it inspirational and slightly out of focus to draw attention to text that will be overlaid.' },
  { id: 'email-banner', name: 'Email Banner', prompt: 'Adapt this image into a professional banner for an email newsletter. Give it a clean, polished look with excellent contrast.' },
  { id: 'holiday-campaign', name: 'Holiday Campaign', prompt: 'Give this image a festive, holiday atmosphere using elements like warm lighting, sparkles, or subtle seasonal decorations.' },
];
