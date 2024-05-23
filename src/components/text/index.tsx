import { Text as T, TextProps } from 'react-native';
import { TEXT } from '../../ styles';
interface IProps extends TextProps {
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  h5?: boolean;
}
export default function Text({ children, style, ...props }: IProps) {
  return (
    <T
      {...props}
      style={[
        TEXT.default,
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
            : 12,
        },
        style,
      ]}
    >
      {children}
    </T>
  );
}
