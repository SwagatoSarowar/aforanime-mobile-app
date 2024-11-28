import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

export function usePickImage() {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled) {
      setImage(`data:image/jpeg;base64,${result.assets?.[0].base64}` || null);
    }
  };

  return { image, setImage, pickImage };
}
