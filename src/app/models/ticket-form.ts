export interface TicketForm {
  id: number;
  url: string;
  name:	string;
  raw_name:	string;
  display_name:	string;
  raw_display_name:	string;
  position:	number;
  active:	boolean;
  end_user_visible:	boolean;
  default:	boolean;
  ticket_field_ids:	number[];
  in_all_brands:	boolean;
  restricted_brand_ids:	number[];
  in_all_organizations:	boolean;
  restricted_organization_ids:	number[];
}

export function cloneTicketForm(field: TicketForm): TicketForm {
  let clone = {} as TicketForm;

  for (var key in field) {
    clone[key] = field[key];
  }

  delete clone.id;
  delete clone.url;
  delete clone.restricted_brand_ids;
  delete clone.restricted_organization_ids;

  return clone;
}