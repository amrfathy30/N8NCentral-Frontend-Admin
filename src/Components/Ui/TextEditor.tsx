import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface TextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export default function TextEditor({ value, onChange, placeholder }: TextEditorProps) {
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'align': [] }],
            ['clean']
        ],
    };

    return (
        <div className="bg-white rounded-lg border border-[#E5E7EB] overflow-hidden custom-quill-editor">
            <ReactQuill
                theme="snow"
                value={value}
                onChange={onChange}
                modules={modules}
                placeholder={placeholder}
            />
        </div>
    );
}
