import { FormikProps } from 'formik';
import styles from '../ui/styles.module.scss';

export const getValidationListItem = (formik: FormikProps<any>, condition: any, text: string) => {
   const className = formik.values.password
      ? condition
         ? styles.form__item_success
         : styles.form__item_error
      : styles.form__item;

   const icon = formik.values.password ? (condition ? '✅' : '❌') : '';

   return (
      <li className={className}>
         {text} {icon}
      </li>
   );
};
