// ui
import FormButton from '@/ui/foundations/formField/formButton';
import FormCheckbox from '@/ui/foundations/formField/formCheckbox';
import FormHidden from '@/ui/foundations/formField/formHidden';
import FormInput from '@/ui/foundations/formField/formInput';
import FormRadio from '@/ui/foundations/formField/formRadio';
import FormSelect from '@/ui/foundations/formField/formSelect';

// ui guards
import {
  isFormButtonFieldData,
  isFormCheckboxFieldData,
  isFormHiddenFieldData,
  isFormInputFieldData,
  isFormRadioFieldData,
  isFormSelectFieldData,
} from '@/ui/foundations/formField/formFieldTypeGuards';

interface FormFieldProps {
  type: string;
  fieldData: unknown;
}

export default function FormField({type, fieldData}: FormFieldProps) {
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
