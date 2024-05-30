import { Text as T, TextProps } from 'react-native';
import { TEXT } from '../../ styles';
interface IProps extends TextProps {
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  h5?: boolean;
  center?: boolean;
}
export default function Text({ children, style, center, ...props }: IProps) {
  return (
    <T
      {...props}
      style={[
        {
          fontSize: props.h1
            ? 32
            : props.h2
              ? 24
              : props.h3
                ? 18
                : props.h4
                  ? 16
                  : props.h5
                    ? 14
                    : TEXT.default.fontSize,
          textAlign: center ? 'center' : 'left',
        },
        style,
      ]}
    >
      {children}
    </T>
  );
}
