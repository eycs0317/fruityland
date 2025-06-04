type HeadingProps = {
  level: number;
  content: string;
  className?: string | null;
};

export default function Heading({level, content, className=null}: HeadingProps) {

  return (
    <>
      {(() => {
        switch (level) {
          case 1:
            return <h1 className={className ? className : 'text-6xl'}>{content}</h1>;
          case 2:
            return <h2 className={className ? className : 'text-5xl'}>{content}</h2>;
          case 3:
            return <h3 className={className ? className : 'text-4xl'}>{content}</h3>;
          case 4:
            return <h4 className={className ? className : 'text-3xl'}>{content}</h4>;
          case 5:
            return <h5 className={className ? className : 'text-2xl'}>{content}</h5>;
          case 6:
            return <h6 className={className ? className : 'text-xl'}>{content}</h6>;
        }
      })()}
    </>
  );
}
