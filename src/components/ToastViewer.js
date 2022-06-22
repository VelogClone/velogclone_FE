// Toast-UI Viewer 임포트
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';

export default function ToastViewer({ text, mdText }) {
    // 마크다운
    const markdown = `## 마크다운 헤더`;
    console.log(text)
    // HTML: span태그 글자색을 파란색으로 설정
    const html = `${text}`;

    return (
        <div>
            <Viewer initialValue={markdown} />

            <Viewer initialValue={text || ""} />
        </div>
    );
}