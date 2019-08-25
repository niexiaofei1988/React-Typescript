export const fontWeight = [
  'normal',
  'bold',
  'bolder',
  'lighter',
  'initial',
  'inherit',
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
];

export const sizes = Array(10)
  .fill(1)
  .map((item, index) => index * 2 + 12);

export const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
