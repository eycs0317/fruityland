/*
  USAGE:
  ===========
  <FormField type='hidden' fieldData={{
    id: 'redirectTo',                     @required
    value: '/dashboard'                   @optional
  }} />
*/

export type FormHiddenProps = {
  fieldData: {
    id: string;
    value?: string;
  };
};

export default function FormHidden({fieldData}: FormHiddenProps) {
  return (
    <input type="hidden" name={fieldData.id} id={fieldData.id} defaultValue={fieldData.value ?? undefined} />
  );
}
