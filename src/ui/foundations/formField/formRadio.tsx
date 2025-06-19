/*
  USAGE:
  ===========
  <FormField type='radio' fieldData={{
    groupLabel: 'Please select a color',        @required
    groupName: 'colorName',                     @required
    groupClassName: 'flex flex-row gap-6',      @optional | @default: 'flex flex-row gap-6'
    isRequired: false,                          @optional | @options: true | false
    isError: false,                             @optional | @default: true | false
    helper: 'Select one option',                @optional
    radios: [{                                  @required
      label: 'Red',                             @required
      value: 'value_red',                       @required
      id: 'id_red',                             @required
      wrapperClassName: 'flex flex-row',        @optional | @default: 'flex flex-row'
      className: 'border mr-2',                 @optional | @default: 'border mr-2'
      isChecked: true                           @optional | @default: true | false
    }, {
      label: 'Orange',                          @required
      value: 'value_orange',                    @required
      id: 'id_orange',                          @required
      wrapperClassName: 'flex flex-row',        @optional | @default: 'flex flex-row'
      className: 'border mr-2',                 @optional | @default: 'border mr-2'
      isChecked: false                          @optional | @default: true | false
    }]
  }} />
*/

export type FormRadioProps = {
  fieldData: {
    groupName: string;
    groupLabel: string;
    radios: {
      id: string;
      label: string;
      value: string;
      className?: string;
      wrapperClassName?: string;
      isChecked?: boolean;
      isDisabled?: boolean;
    }[];
    groupClassName?: string;
    isRequired?: boolean;
    isError?: boolean;
    helper?: string;
  };
};

export default function FormRadio({fieldData}: FormRadioProps) {
  const defaultGroupClassName = 'flex flex-row gap-6';
  const defaultWrapperClassName = 'flex flex-row';
  const defaultClassName = 'border mr-2';
  const radiosData = fieldData.radios;

  return (
    <fieldset className={((fieldData.groupClassName) ? fieldData.groupClassName : defaultGroupClassName) + ((fieldData.isRequired) ? ' formRequired' : '') + ((fieldData.isError) ? ' formError' : '')}>
      <legend className="w-full pb-2">{fieldData.groupLabel}</legend>
      {radiosData.map((radioData) => (
        <div key={radioData.id} className={defaultWrapperClassName + ((radioData.wrapperClassName) ? ' ' + radioData.wrapperClassName : '') + ((radioData.isDisabled) ? ' isDisabled' : '')}>
          <input type="radio" name={fieldData.groupName} id={radioData.id} className={defaultClassName + ((radioData.className) ? ' ' + radioData.className : '')} defaultValue={radioData.value} defaultChecked={(radioData.isChecked) ? radioData.isChecked : false} disabled={(radioData.isDisabled) ? radioData.isDisabled : false} />
          <label htmlFor={radioData.id} className="block w-full text-primary-500">{radioData.label}</label>
        </div>
      ))}
      {(() => {
        return (fieldData.helper) ? <small className="helper">{fieldData.helper}</small> : null;
      })()}
    </fieldset>
  );
}
