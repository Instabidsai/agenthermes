// ---------------------------------------------------------------------------
// Fulfillment Email/SMS Templates
// Generates subject + body for common fulfillment notifications.
// ---------------------------------------------------------------------------

export type TemplateName = 'new_lead' | 'booking_request' | 'quote_request' | 'emergency'

interface TemplateResult {
  subject: string
  body: string
  sms?: string // Short version for SMS
}

/**
 * Render a fulfillment notification template from tool call input data.
 *
 * @param template - Which template to render
 * @param input    - The tool call input (arbitrary key-value from the agent)
 * @param meta     - Extra context (business name, tool name, etc.)
 */
export function renderTemplate(
  template: TemplateName,
  input: Record<string, any>,
  meta: { businessName?: string; toolName?: string; agentId?: string } = {}
): TemplateResult {
  const customerName = input.customer_name || input.name || input.contact_name || 'Unknown'
  const phone = input.phone || input.phone_number || input.contact_phone || ''
  const email = input.email || input.contact_email || ''
  const service = input.service || input.service_type || input.category || ''
  const details = input.details || input.description || input.notes || input.message || ''
  const date = input.date || input.preferred_date || input.appointment_date || ''
  const time = input.time || input.preferred_time || input.appointment_time || ''
  const address = input.address || input.location || input.service_address || ''
  const bizName = meta.businessName || 'Your Business'
  const toolName = meta.toolName || 'agent'

  // Build a formatted details block from all input fields
  const detailLines = Object.entries(input)
    .filter(([, v]) => v !== null && v !== undefined && v !== '')
    .map(([k, v]) => `  ${formatKey(k)}: ${v}`)
    .join('\n')

  switch (template) {
    case 'new_lead':
      return {
        subject: `New Agent Lead: ${customerName} wants ${service || 'your services'}`,
        body: [
          `New lead captured by AI agent via ${toolName}`,
          '',
          `Customer: ${customerName}`,
          phone ? `Phone: ${phone}` : null,
          email ? `Email: ${email}` : null,
          service ? `Service: ${service}` : null,
          details ? `Details: ${details}` : null,
          address ? `Address: ${address}` : null,
          '',
          '--- Full Agent Input ---',
          detailLines,
          '',
          `This lead was captured automatically by an AI agent on ${bizName}.`,
          'Reply to this email or contact the customer directly.',
        ].filter(Boolean).join('\n'),
        sms: `New lead: ${customerName}${service ? ` wants ${service}` : ''}. ${phone ? `Phone: ${phone}` : email ? `Email: ${email}` : 'Check email for details.'}`,
      }

    case 'booking_request':
      return {
        subject: `Booking Request via AI Agent: ${customerName}${date ? ` for ${date}` : ''}`,
        body: [
          `Booking request received via AI agent (${toolName})`,
          '',
          `Customer: ${customerName}`,
          phone ? `Phone: ${phone}` : null,
          email ? `Email: ${email}` : null,
          service ? `Service: ${service}` : null,
          date ? `Preferred Date: ${date}` : null,
          time ? `Preferred Time: ${time}` : null,
          address ? `Address: ${address}` : null,
          details ? `Notes: ${details}` : null,
          '',
          '--- Full Agent Input ---',
          detailLines,
          '',
          `Please confirm or reschedule this booking for ${bizName}.`,
        ].filter(Boolean).join('\n'),
        sms: `Booking request: ${customerName}${date ? ` on ${date}` : ''}${time ? ` at ${time}` : ''}. ${phone ? `Call: ${phone}` : 'Check email for details.'}`,
      }

    case 'quote_request':
      return {
        subject: `Quote Requested via AI Agent: ${customerName}${service ? ` for ${service}` : ''}`,
        body: [
          `Quote request received via AI agent (${toolName})`,
          '',
          `Customer: ${customerName}`,
          phone ? `Phone: ${phone}` : null,
          email ? `Email: ${email}` : null,
          service ? `Service Requested: ${service}` : null,
          details ? `Details: ${details}` : null,
          address ? `Location: ${address}` : null,
          '',
          '--- Full Agent Input ---',
          detailLines,
          '',
          `Please prepare and send a quote for ${bizName}.`,
        ].filter(Boolean).join('\n'),
        sms: `Quote request: ${customerName}${service ? ` for ${service}` : ''}. ${phone ? `Phone: ${phone}` : 'Check email for details.'}`,
      }

    case 'emergency':
      return {
        subject: `URGENT: Emergency Service Request via AI Agent`,
        body: [
          '*** EMERGENCY SERVICE REQUEST ***',
          '',
          `Customer: ${customerName}`,
          phone ? `Phone: ${phone}` : null,
          email ? `Email: ${email}` : null,
          service ? `Service: ${service}` : null,
          address ? `Location: ${address}` : null,
          details ? `Details: ${details}` : null,
          '',
          '--- Full Agent Input ---',
          detailLines,
          '',
          `This was flagged as an emergency by the AI agent on ${bizName}.`,
          'Please respond immediately.',
        ].filter(Boolean).join('\n'),
        sms: `URGENT: ${customerName} needs emergency service${address ? ` at ${address}` : ''}. ${phone ? `Call: ${phone}` : 'Check email NOW.'}`,
      }

    default:
      // Fallback for unknown templates — just dump everything
      return {
        subject: `Agent Notification: ${toolName} on ${bizName}`,
        body: [
          `Notification from AI agent (${toolName})`,
          '',
          '--- Agent Input ---',
          detailLines,
        ].join('\n'),
        sms: `Agent notification from ${bizName}. Check email for details.`,
      }
  }
}

/**
 * Detect which template to use based on tool name patterns.
 */
export function detectTemplate(toolName: string): TemplateName {
  const lower = toolName.toLowerCase()

  if (lower.includes('emergency') || lower.includes('urgent')) {
    return 'emergency'
  }
  if (lower.includes('book') || lower.includes('schedule') || lower.includes('appointment') || lower.includes('reserve')) {
    return 'booking_request'
  }
  if (lower.includes('quote') || lower.includes('estimate') || lower.includes('pricing')) {
    return 'quote_request'
  }
  return 'new_lead'
}

// --- Helpers ---

function formatKey(key: string): string {
  return key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}
