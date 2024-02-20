import { useRef } from 'react';
import Button from './UI/Button.tsx';
import Form, { FormHandle } from './UI/Form.tsx';
import Input from './UI/Input.tsx';
import { useTimersContext } from '../Store/timers-context.tsx';

// previous App code transferred to this component.
const AddTimer = () => {
  const form = useRef<FormHandle>(null);
//access useTImerContext to be able add timer
const {addTimer} = useTimersContext();

  function handleSaveTimer(data: unknown) {
    const extractedData = data as { name: string; duration: string };
    addTimer({
      name: extractedData.name,
      duration: +extractedData.duration, // + type casts to number
    });
    form.current?.clear();
  }

  return (
    <Form ref={form} onSave={handleSaveTimer} id="add-timer">
      <Input type="text" label="Name" id="name" />
      <Input type="number" label="Duration" id="duration" />
      <p>
        <Button>Add Timer</Button>
      </p>
    </Form>
  );
}
export default AddTimer;
