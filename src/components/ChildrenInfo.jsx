import { Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

export default function ChildrenInfo({ title, content }) {
  return (
    <>
      <motion.div initial={{ x: -100 }} animate={{ x: 0 }}>
        <Text color={"gray.400"}>{title}</Text>
        {content}
      </motion.div>
    </>
  );
}
