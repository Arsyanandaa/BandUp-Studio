import { Text, Pressable } from 'react-native'
import { onboardingstyles } from "../styles/onboarding"

type PrimaryButtonProps = {
    title: string;
    onPress: () => void;
};

const PrimaryButton = ({title, onPress}: PrimaryButtonProps) => {
  return (
    <Pressable
    onPress={onPress} style = {onboardingstyles.button}>
    <Text style = {onboardingstyles.buttonText}>{title}</Text>
    </Pressable>
  )
}

export default PrimaryButton