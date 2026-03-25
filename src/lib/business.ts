import { getServiceClient } from './supabase'

export async function getBusinessBySlug(slug: string) {
  const supabase = getServiceClient()
  const { data, error } = await supabase
    .from('businesses')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return { business: null, error: null }
    return { business: null, error }
  }
  return { business: data as Record<string, any>, error: null }
}
