/**
 * UIX — Studio Redirect
 *
 * Sanity Studio is hosted at uix.sanity.studio (Sanity Cloud).
 * This route redirects editors there instead of embedding the Studio
 * in the Next.js app (which is too heavy for the 512MB Droplet).
 */

import { redirect } from 'next/navigation';

export default function StudioRedirect() {
  redirect('https://uix.sanity.studio');
}
