import {
  Box,
  Button,
  Fieldset,
  Group,
  NumberInput,
  rem,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { MonthPickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { IconCalendar } from '@tabler/icons-react';
import { SyntheticEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { resumeInputType } from '@/lib/enums/resumeDataEnum';
import { addEducationInfo } from '@/lib/store/resumeDataSlice/educationInfoSlice';
import { RootState } from '@/lib/store/store';
import { EducationInterface } from '@/lib/utils/interfaces';
export const initialData: EducationInterface = {
  uid: uuidv4(),
  indexID: 0,
  title: '',
  degree: '',
  fieldOfStudy: '',
  startDate: null,
  endDate: null,
  cgpa: 0.0,
  description: '',
};

const EducationInfo = () => {
  const form = useForm({
    mode: 'controlled',
    initialValues: { ...initialData },
  });
  const dispatch = useDispatch();
  const educationData = useSelector(
    (state: RootState) => state[resumeInputType.EDUCATION_INFO]
  );

  const submitHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    const uid = uuidv4();
    const indexID = educationData.length;
    const startD = form.values.startDate?.toString();
    const endD = form.values.endDate?.toString();
    dispatch(
      addEducationInfo({
        ...form.values,
        indexID,
        uid,
        startDate: startD,
        endDate: endD,
      })
    );
  };

  return (
    <Box flex={1}>
      <Text pb={20}>Educational information</Text>
      <form onSubmit={submitHandler}>
        <Fieldset mb={20}>
          <TextInput
            required
            label='School'
            placeholder='Ex. Babu Banarsi University'
            key='title'
            {...form.getInputProps(`title`)}
          />
          <TextInput
            required
            label='Degree'
            placeholder="Ex. Bachelor's"
            key='degree'
            {...form.getInputProps(`degree`)}
            mt='md'
          />
          <TextInput
            label='Field of Study'
            placeholder='Ex. Business'
            key='field of study'
            {...form.getInputProps(`fieldOfStudy`)}
            mt='md'
          />
          <Group grow>
            <MonthPickerInput
              valueFormat='YYYY MMM'
              leftSection={
                <IconCalendar
                  style={{ width: rem(18), height: rem(18) }}
                  stroke={1.5}
                />
              }
              label='Start date'
              placeholder='Pick date'
              key='start date'
              {...form.getInputProps(`startDate`)}
            />
            <MonthPickerInput
              valueFormat='YYYY MMM'
              leftSection={
                <IconCalendar
                  style={{ width: rem(18), height: rem(18) }}
                  stroke={1.5}
                />
              }
              label='End date'
              placeholder='Pick date'
              key='end date'
              {...form.getInputProps(`endDate`)}
            />
          </Group>
          <NumberInput
            label='CGPA'
            description='Enter your latest CGPA obtained'
            placeholder='0.0'
            key='cgpa'
            {...form.getInputProps(`cgpa`)}
            min={1.0}
            max={10.0}
          />
          <Textarea
            resize='both'
            label='Description'
            key='description'
            description='Any details you want to share from this degree'
            placeholder='Topped the class by Rank 1, was head boy in high title'
            {...form.getInputProps(`description`)}
          />
        </Fieldset>
        <Button type='submit'>Save</Button>
      </form>
    </Box>
  );
};
export default EducationInfo;
