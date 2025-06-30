'use client';

import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import './quillCustom.css'; // ⬅️ Add this line for custom styles

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const RichTextEditor = ({ value, onChange }: Props) => {
  return (
    <div className="my-4">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={{
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            ['link', 'image'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['clean']
          ]
        }}
      />
    </div>
  );
};

export default RichTextEditor;
