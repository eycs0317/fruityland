/*
  USAGE:
  ===========
  <FormField type='button' fieldData={{
    type: 'submit',                       @required | @options: 'submit' | 'button'
    id: 'btSubmit',                       @required
    value: 'Submit'                       @required
    className: 'button primary',          @optional | @default: 'button'
    image: {                              @optional
      width: 24,                          @required
      height: 24,                         @required
      alt: 'Google Logo',                 @required
      src: '/assets/i/icons/google.svg'   @required
    }
  }} />
*/

// nextjs
import Image from 'next/image';

export type FormButtonProps = {
  fieldData: {
    id: string;
    type: 'button' | 'submit' | 'reset';
    value: string;
    className?: string;
    image?: {
      src: string;
      alt: string;
      width: number;
      height: number;
    };
    onClick?: () => void;
  };
};

export default function FormButton({fieldData, ...rest}: FormButtonProps) {
  const defaultClassName = 'button';

  return (
    <button
      type={fieldData.type}
      name={fieldData.id}
      id={fieldData.id}
      className={defaultClassName + ((fieldData.className) ? ' ' + fieldData.className : '')}
      value={fieldData.value}
      onClick={fieldData.onClick}
      {...rest}>{fieldData.value}
      {(() => {
        return (fieldData.image) ? <Image src={fieldData.image.src} alt={fieldData.image.alt} width={fieldData.image.width} height={fieldData.image.height} priority={true} /> : null;
      })()}
    </button>
  );
}
