import React from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInputChangeEventData,
} from 'react-native';
import * as Yup from 'yup';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Colors, TextField, View } from 'react-native-ui-lib';
import { useFormik } from 'formik';
import { useNavigation } from '@react-navigation/native';

import { useDeviceStore } from '../../store/deviceStore';

interface FormValues {
  id: string;
  name: string;
  url: string;
  token: string;
}

const FormComponent = () => {
  const { getAllDevices, addDevice } = useDeviceStore();
  const navigation = useNavigation();

  const inputSchema = Yup.object().shape({
    id: Yup.string().max(6, 'Too Long!').required('Id Device Harus Diisi'),
    name: Yup.string().required('Nama Device Harus Diisi'),
    url: Yup.string().required('Url Harus Diisi'),
    token: Yup.string().required('Token Harus Diisi'),
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      id: '',
      name: '',
      url: '',
      token: '',
    },

    validationSchema: inputSchema,

    onSubmit: (values: FormValues, { resetForm }) => {
      addDevice(values);
      resetForm();
      navigation.goBack();
      getAllDevices();
    },
  });

  return (
    <ScrollView keyboardShouldPersistTaps="always">
      <View flex padding-24 marginH-12>
        <View>
          <TextField
            placeholder="ID Perangkat"
            floatingPlaceholder
            onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) =>
              formik.handleChange('id')(e.nativeEvent.text)
            }
            value={formik.values.id}
            validationMessage={formik.errors.id}
            enableErrors
            validateOnChange={true}
            containerStyle={styles.container}
            fieldStyle={styles.withUnderline}
          />
        </View>
        <View>
          <TextField
            placeholder="Nama Perangkat"
            floatingPlaceholder
            onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) =>
              formik.handleChange('name')(e.nativeEvent.text)
            }
            value={formik.values.name}
            validationMessage={formik.errors.name}
            enableErrors
            validateOnChange={true}
            containerStyle={styles.container}
            fieldStyle={styles.withUnderline}
          />
        </View>
        <View>
          <TextField
            placeholder="URL"
            floatingPlaceholder
            onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) =>
              formik.handleChange('url')(e.nativeEvent.text)
            }
            value={formik.values.url}
            validationMessage={formik.errors.url}
            enableErrors
            validateOnChange={true}
            containerStyle={styles.container}
            fieldStyle={styles.withUnderline}
            hint="Thinger URL"
          />
        </View>
        <View>
          <TextField
            placeholder="Token"
            floatingPlaceholder
            onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) =>
              formik.handleChange('token')(e.nativeEvent.text)
            }
            value={formik.values.token}
            validationMessage={formik.errors.token}
            enableErrors
            validateOnChange={true}
            containerStyle={styles.container}
            fieldStyle={styles.withUnderline}
            hint="Token URL"
          />
        </View>
      </View>
      <View>
        <Button
          row
          label="Submit"
          size="large"
          labelStyle={styles.buttonLabelStyle}
          style={styles.buttonContainer}
          onPress={formik.handleSubmit}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  withUnderline: {
    borderBottomWidth: 1.5,
    borderColor: Colors.$outlineDisabledHeavy,
    padding: 4,
  },
  buttonContainer: {
    marginHorizontal: 30,
    marginVertical: 10,
  },
  buttonLabelStyle: {
    fontWeight: '700',
    fontSize: 16,
  },
});

export default FormComponent;
