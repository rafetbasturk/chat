function showSelectedImage(
  data: File,
  set: React.Dispatch<React.SetStateAction<string | ArrayBuffer | null>>
) {
  const file = new FileReader();
  file.readAsDataURL(data);

  file.onload = () => {
    set(file.result);
  };
}

export default showSelectedImage;
