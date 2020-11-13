import { helper } from '../helper/helper';

export default function makeForm(type) {
  const form = helper.createElement('form');
  const input = helper.createElement('input');
  input.type = 'text';
  input.autocomplete = 'off';
  input.spellcheck = 'off';
  input.placeholder = `Add a new ${type}...`;
  input.name = type;

  form.append(input);
  return form;
}
