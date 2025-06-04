// ui
import FormButton from '@/ui/foundations/formField/formButton';
import FormCheckbox from '@/ui/foundations/formField/formCheckbox';
import FormHidden from '@/ui/foundations/formField/formHidden';
import FormInput from '@/ui/foundations/formField/formInput';
import FormRadio from '@/ui/foundations/formField/formRadio';
import FormSelect from '@/ui/foundations/formField/formSelect';

import type {FormButtonProps} from '@/ui/foundations/formField/formButton';
import type {FormCheckboxProps} from '@/ui/foundations/formField/formCheckbox';
import type {FormHiddenProps} from '@/ui/foundations/formField/formHidden';
import type {FormInputProps} from '@/ui/foundations/formField/formInput';
import type {FormRadioProps} from '@/ui/foundations/formField/formRadio';
import type {FormSelectProps} from '@/ui/foundations/formField/formSelect';

function isFormButtonFieldData(data: unknown): data is FormButtonProps['fieldData'] {
  if (
    typeof data === 'object' &&
    data !== null
  ) {
    const obj = data as { [key: string]: unknown };
    return (
      typeof obj.id === 'string' &&
      (obj.type === 'button' || obj.type === 'submit' || obj.type === 'reset') &&
      typeof obj.value === 'string'
    );
  }
  return false;
}

function isFormCheckboxFieldData(data: unknown): data is FormCheckboxProps['fieldData'] {
  if (typeof data === 'object' && data !== null) {
    const obj = data as { [key: string]: unknown };
    return (
      typeof obj.id === 'string' &&
      typeof obj.value === 'string' &&
      typeof obj.label === 'string'
    );
  }
  return false;
}

function isFormHiddenFieldData(data: unknown): data is FormHiddenProps['fieldData'] {
  if (typeof data === 'object' && data !== null) {
    const obj = data as { [key: string]: unknown };
    return typeof obj.id === 'string' && (typeof obj.value === 'string' || obj.value === undefined);
  }
  return false;
}

function isFormInputFieldData(data: unknown): data is FormInputProps['fieldData'] {
  if (typeof data === 'object' && data !== null) {
    const obj = data as { [key: string]: unknown };
    return (
      typeof obj.id === 'string' &&
      typeof obj.type === 'string' &&
      typeof obj.label === 'string'
    );
  }
  return false;
}

function isFormRadioFieldData(data: unknown): data is FormRadioProps['fieldData'] {
  if (typeof data === 'object' && data !== null) {
    const obj = data as Record<string, unknown>;
    return (
      typeof obj.groupName === 'string' &&
      typeof obj.groupLabel === 'string' &&
      Array.isArray(obj.radios) &&
      obj.radios.every(
        (radio: unknown) =>
          typeof radio === 'object' &&
          radio !== null &&
          typeof (radio as Record<string, unknown>).id === 'string' &&
          typeof (radio as Record<string, unknown>).label === 'string' &&
          typeof (radio as Record<string, unknown>).value === 'string'
      )
    );
  }
  return false;
}

function isFormSelectFieldData(data: unknown): data is FormSelectProps['fieldData'] {
  if (typeof data === 'object' && data !== null) {
    const obj = data as Record<string, unknown>;
    return (
      typeof obj.id === 'string' &&
      typeof obj.label === 'string' &&
      Array.isArray(obj.options) &&
      obj.options.every(
        (option: unknown) =>
          typeof option === 'object' &&
          option !== null &&
          typeof (option as Record<string, unknown>).id === 'string' &&
          typeof (option as Record<string, unknown>).value === 'string'
      )
    );
  }
  return false;
}

export default function FormField({type, fieldData}: {type: string; fieldData: unknown}) {
  return (
    <>
      {(() => {
        switch (type) {
          case 'button':
            if (isFormButtonFieldData(fieldData)) {
              return <FormButton fieldData={fieldData} />;
            } else {
              return <p>Error: Invalid button data</p>;
            }
          case 'checkbox':
            if (isFormCheckboxFieldData(fieldData)) {
              return <FormCheckbox fieldData={fieldData} />;
            } else {
              return <p>Error: Invalid checkbox data</p>;
            }
          case 'hidden':
            if (isFormHiddenFieldData(fieldData)) {
              return <FormHidden fieldData={fieldData} />;
            } else {
              return <p>Error: Invalid hidden data</p>;
            }
          case 'radio':
            if (isFormRadioFieldData(fieldData)) {
              return <FormRadio fieldData={fieldData} />;
            } else {
              return <p>Error: Invalid radio data</p>;
            }
          case 'select':
            if (isFormSelectFieldData(fieldData)) {
              return <FormSelect fieldData={fieldData} />;
            } else {
              return <p>Error: Invalid select data</p>;
            }
          default:
            if (isFormInputFieldData(fieldData)) {
              return <FormInput fieldData={fieldData} />;
            } else {
              return <p>Error: Invalid input data</p>;
            }
        }
      })()}
    </>
  );
}
