import React, { useState } from 'react';
import {
  ArgsTable,
  Primary,
  Stories,
  PRIMARY_STORY,
} from '@storybook/addon-docs';
import { Unstyled } from '@storybook/blocks';

import { Input } from '../index';
import { Typography } from '../../Typography';
import { Stack } from '../../Stack';

import inputClassNames from '../style.module.scss';

const { Title, Paragraph, Text } = Typography;

export const InputDocs = () => {
  const [value, setValue] = useState('Text');
  const handleChange = (updatedValue: string) => setValue(updatedValue);

  return (
    <Unstyled>
      <Title
        level={1}
        fontVariant="h4"
        style={{
          marginBottom: 0,
        }}
      >
        Поле ввода
      </Title>
      <Paragraph
        fontVariant="caption"
        style={{ marginTop: 0, color: 'var(--color-primary-50)' }}
      >
        {inputClassNames.input}
      </Paragraph>

      <br />

      <Paragraph>
        Input (поле ввода) — компонент, который позволяет указать значение с
        помощью клавиатуры.
      </Paragraph>

      <Title level={2} fontVariant="h6">
        Как использовать
      </Title>
      <Paragraph>
        Если нужно ввести больше 5 слов, то лучше использовать многострочное
        поле ввода. Если нужно сделать инпут с выпадающим списком, то лучше
        использовать поле выбора.
      </Paragraph>
      <Paragraph>Основные правила применения инпута:</Paragraph>
      <ul>
        <Text>
          <li>Название поля пишется с заглавной буквы;</li>
        </Text>
        <Text>
          <li>
            Называйте поле ввода существительным, указывающим, что нужно ввести.
            Избегайте имен собственных (например, ваш, мой и т. п.);
          </li>
        </Text>
        <Text>
          <li>Не ставьте двоеточие в названии;</li>
        </Text>
        <Text>
          <li>Используйте подсказку в инпуте, чтобы помочь пользователю.</li>
        </Text>
      </ul>
      <Paragraph>
        Разрешено использовать иконки в названии и в самом инпуте.
      </Paragraph>
      <div style={{ margin: '24px 0' }}>
        <Input.Text leftIconName="user" />
      </div>

      <Paragraph>
        Используйте поле ввода для коротких текстовых или цифровых значений без
        предсказуемого формата.
      </Paragraph>

      <Title level={2} fontVariant="h6">
        Виды инпутов
      </Title>
      <Paragraph>В системе существует всего 3 вида полей ввода:</Paragraph>
      <ol>
        <Text>
          <li>Top Lable (название поля сверху)</li>
        </Text>
        <Text>
          <li>Left Lable (название поля слева)</li>
        </Text>
        <Text>
          <li>No Lable (без названия)</li>
        </Text>
      </ol>
      <Stack size={24} align="end" style={{ margin: '24px 0' }}>
        <Input.Text label="Top Label" />
        <Input.Text label="Left Label" labelPosition="left" />
        <Input.Text placeholder="No Label" />
      </Stack>
      <Paragraph>Также инпуты делятся на Fill и No Fill.</Paragraph>
      <Stack size={24} style={{ margin: '24px 0' }}>
        <Input.Text label="No Fill" />
        <Input.Text label="Fill" value={value} onChange={handleChange} />
      </Stack>

      <Title level={2} fontVariant="h6">
        Состояния инпутов
      </Title>
      <Paragraph>Все инпуты имеют 5 состояний:</Paragraph>
      <ol>
        <Text>
          <li>Rest (покой)</li>
        </Text>
        <Text>
          <li>Hover (наведение)</li>
        </Text>
        <Text>
          <li>Focus (в фокусе)</li>
        </Text>
        <Text>
          <li>Disable (недоступно)</li>
        </Text>
        <Text>
          <li>Error (ошибка)</li>
        </Text>
      </ol>
      <Stack size={24} wrap style={{ margin: '24px 0' }}>
        <Stack direction="column" align="start">
          <Text fontVariant="captionBold">Rest</Text>
          <Input.Text value={value} onChange={handleChange} />
        </Stack>
        <Stack direction="column" align="start">
          <Text fontVariant="captionBold">Hover me</Text>
          <Input.Text value={value} onChange={handleChange} />
        </Stack>
        <Stack direction="column" align="start">
          <Text fontVariant="captionBold">Focus with keyboard</Text>
          <Input.Text value={value} onChange={handleChange} />
        </Stack>
        <Stack direction="column" align="start">
          <Text fontVariant="captionBold">Disable</Text>
          <Input.Text disabled value={value} onChange={handleChange} />
        </Stack>
        <Stack direction="column" align="start">
          <Text fontVariant="captionBold">Error</Text>
          <Input.Text
            errorMessage="Error Message"
            value={value}
            onChange={handleChange}
          />
        </Stack>
      </Stack>

      <br />
      <br />
      <Primary />
      <ArgsTable story={PRIMARY_STORY} />
      <Stories />
    </Unstyled>
  );
};
