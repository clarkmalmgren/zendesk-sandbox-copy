export interface TicketField {
  id: number;
  url: string;
  type: string;
  title: string;
  raw_title: string;
  description: string;
  raw_description: string;
  position: number;
  active: boolean;
  required: boolean;
  collapsed_for_agents: boolean;
  regexp_for_validation: boolean;
  title_in_portal: string;
  raw_title_in_portal: string;
  visible_in_portal: boolean;
  editable_in_portal: boolean;
  required_in_portal: boolean;
  tag: string;
  created_at: string;
  updated_at: string;
  removable: boolean
  system_field_options: any[];
  custom_field_options: any[];
}

export function isCustomField(field: TicketField):boolean {
    switch (field.type) {
      case 'text':
      case 'textarea':
      case 'checkbox':
      case 'date':
      case 'integer':
      case 'decimal':
      case 'regexp':
      case 'tagger':
        return true;
    }
    return false;
}

export function isSystemField(field: TicketField): boolean {
  return !isCustomField(field);
}

export function cloneTicketField(field: TicketField): TicketField {
  let clone = {} as TicketField;

  for (var key in field) {
    clone[key] = field[key];
  }

  delete clone.id;
  delete clone.url;
  delete clone.created_at;
  delete clone.updated_at;
  delete clone.system_field_options;
  delete clone.removable;

  return clone;
}