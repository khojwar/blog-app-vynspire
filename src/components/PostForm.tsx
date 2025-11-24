'use client';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Button, TextField } from '@mui/material';
import dynamic from "next/dynamic";

try {
  const ReactDOM = require('react-dom');
  if (ReactDOM && typeof ReactDOM.findDOMNode !== 'function') {
    ReactDOM.findDOMNode = function (componentOrElement: any) {
      // If a DOM node was passed, return it.
      if (!componentOrElement) return null;
      if (componentOrElement.nodeType) return componentOrElement;
      // If a ref object was passed, return its current value.
      if (componentOrElement.current && componentOrElement.current.nodeType) {
        return componentOrElement.current;
      }
      // As a last resort, try to look for a child DOM node (fallback).
      try {
        if (componentOrElement instanceof Object && 'props' in componentOrElement) {
          const el = (componentOrElement as any).props && (componentOrElement as any).props.children;
          if (el && el.nodeType) return el;
        }
      } catch (err) {
        // ignore
      }
      return null;
    };
  }
} catch (e) {
  // ignore silently — if require fails, dynamic import below will still run client-side
}

import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});



const schema = Yup.object({
  title: Yup.string().required('Title is required'),
  body: Yup.string()
    .test("not-empty", "Content is required", (value) =>
      !!value && value.replace(/<(.|\n)*?>/g, "").trim().length > 0
    ),
});

interface PostFormProps {
  initialValues?: { id?: number; title: string; body: string };
  onSubmit: (data: { id?: number; title: string; body: string }) => void;
}

const PostForm: React.FC<PostFormProps> = ({ initialValues = { title: '', body: '' }, onSubmit }) => {
  const { register, control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  return (
    <div className='flex flex-col justify-center items-center m-16 '>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 space-y-4 shadow-lg p-6 rounded bg-white w-full min-w-md lg:min-w-lg">
        <h1 className="text-2xl text-black mb-4 text-center">Create Post</h1>

        <TextField
          label="Title"
          {...register('title')}
          error={!!errors.title}
          helperText={errors.title?.message}
          fullWidth
        />

        <Controller
          name="body"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <div>
              <ReactQuill
                theme="snow"
                value={field.value}
                onChange={field.onChange}
              />
              {errors.body && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.body.message as string}
                </p>
              )}
            </div>
          )}
        />

        <Button type="submit" variant="contained">Submit</Button>
      </form>
    </div>
  );
};

export default PostForm;
