/*
  USAGE:
  ===========
  <FormField type='checkbox' fieldData={{
    id: 'legal',                              @required
    label: 'I agree with the legal term',     @required
    value: 'legal',                           @required
    wrapperClassName: 'flex items-center',    @optional | @default: 'flex items-center'
    isRequired: false,                        @optional | @options: true | false
    isError: false,                           @optional | @default: true | false
    className: 'border mr-2',                 @optional | @default: 'border mr-2'
    isChecked: true,                          @optional | @options: true | false
    helper: 'Select accept legal term'        @optional
  }} />
*/

export type FormCheckboxProps = {
  fieldData: {
    id: string;
    value: string;
    label: string | React.ReactNode;
    className?: string;
    wrapperClassName?: string;
    isRequired?: boolean;
    isError?: boolean;
    isChecked?: boolean;
    helper?: string;
  };
};

export default function FormInput({fieldData}: FormCheckboxProps) {
  const defaultWrapperClassName = 'flex place-items-start';
  const defaultClassName = 'border mr-2 mt-2';

  return (
    <div className={defaultWrapperClassName + ((fieldData.wrapperClassName) ? ' ' + fieldData.wrapperClassName : '') + ((fieldData.isError) ? ' formError' : '')}>
      <input type="checkbox" name={fieldData.id} id={fieldData.id} className={defaultClassName + ((fieldData.className) ? ' ' + fieldData.className : '')} defaultValue={fieldData.value} defaultChecked={(fieldData.isChecked) ? fieldData.isChecked : false} />
      <label htmlFor={fieldData.id} className="text-neutral-000">{fieldData.label}</label>
      {(() => {
        return (fieldData.helper) ? <small className="helper">{fieldData.helper}</small> : null;
      })()}
    </div>
  );
}
