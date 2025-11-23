'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Button, TextField } from '@mui/material';

const schema = Yup.object({
  title: Yup.string().required('Title is required'),
  body: Yup.string().required('Content is required'),
});

interface PostFormProps {
  initialValues?: { id?: number; title: string; body: string };
  onSubmit: (data: { id?: number; title: string; body: string }) => void;
}

const PostForm: React.FC<PostFormProps> = ({ initialValues = { title: '', body: '' }, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  return (
    <div className='flex flex-col justify-center items-center m-16 '>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 space-y-4 shadow-lg p-6 rounded bg-white w-full min-w-md lg:min-w-lg">
            <h1 className="text-2xl text-black mb-4 text-center">Create Post</h1>
            <TextField label="Title" {...register('title')} error={!!errors.title} helperText={errors.title?.message} fullWidth />
            <TextField label="Content" {...register('body')} error={!!errors.body} helperText={errors.body?.message} multiline rows={4} fullWidth />
            <Button type="submit" variant="contained">Submit</Button>
        </form>
    </div>
  );
};

export default PostForm;