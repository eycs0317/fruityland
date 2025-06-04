/*
  USAGE:
  ===========
  <FormField type='input' fieldData={{
    type: 'text',                               @required | @options: text | email | password | date | tel | url
    id: 'id_firstName',                         @required
    label: 'First Name',                        @required
    wrapperClassName: 'flex flex-col',          @optional | @default: 'flex flex-col'
    isRequired: false,                          @optional | @options: true | false
    isError: false,                             @optional | @default: true | false
    className: 'border p-2 w-full',             @optional | @default: 'border p-2 w-full'
    value: 'John',                              @optional
    maxLength: '5'                              @optional
    placeholder: 'John',                        @optional
    helper: 'Enter first name'                  @optional
  }} />
*/

export type FormInputProps = {
  fieldData: {
    id: string;
    type: string;
    label: string;
    value?: string;
    placeholder?: string;
    maxLength?: number;
    className?: string;
    wrapperClassName?: string;
    isRequired?: boolean;
    isError?: boolean;
    helper?: string;
  };
};

export default function FormInput({fieldData}: FormInputProps) {
  const defaultWrapperClassName = 'flex flex-col';
  const defaultClassName = 'border p-2 w-full leading-[1.3]';

  return (
    <div className={defaultWrapperClassName + ((fieldData.wrapperClassName) ? ' ' + fieldData.wrapperClassName : '') + ((fieldData.isRequired) ? ' formRequired' : '') + ((fieldData.isError) ? ' formError' : '')}>
      <label htmlFor={fieldData.id}>{fieldData.label}:</label>
      <input type={fieldData.type} name={fieldData.id} id={fieldData.id} className={(fieldData.className) ? fieldData.className : defaultClassName} defaultValue={fieldData.value ?? undefined} placeholder={fieldData.placeholder ?? undefined} maxLength={fieldData.maxLength ?? undefined} />
      {(() => {
        return (fieldData.helper) ? <small className="helper">{fieldData.helper}</small> : null;
      })()}
    </div>
  );
}
