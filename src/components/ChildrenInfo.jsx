import { Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

export default function ChildrenInfo({ title, content }) {
  return (
    <>
      <motion.div
        initial={{ x: -300, opacity: 50 }}
        animate={{ x: 0, opacity: 100 }}
        transition={{ ease: "backOut" }}
      >
        <Text color={"gray.400"}>{title}</Text>
        {content}
      </motion.div>
    </>
  );
}
