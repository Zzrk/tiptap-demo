import { UploadOutlined } from "@ant-design/icons"
import { Editor } from "@tiptap/react"
import { Button, message, Tooltip, Upload, UploadProps } from "antd"

export const UploadImage = ({editor}: {editor: Editor}) => {
  const props: UploadProps = {
    beforeUpload: (file) => {
      const isPNG = file.type === 'image/png';
      if (!isPNG) {
        message.error(`${file.name} is not a png file`);
      }
      return isPNG || Upload.LIST_IGNORE;
    },
    onChange: (info) => {
      const reader = new FileReader();
      reader.readAsDataURL(info.fileList[0].originFileObj);
      reader.onload = (e) => {
        const base64 = e.target.result;
        editor.commands.setImage({ src: base64 as string})
      }
    },
    fileList: []
  };

  return (
    <Upload {...props}>
      <Tooltip title="上传图片" className="shrink-0">
        <Button
          className="flex justify-center items-center"
          type="text"
          icon={<UploadOutlined />}
        />
      </Tooltip>
    </Upload>
  )
}