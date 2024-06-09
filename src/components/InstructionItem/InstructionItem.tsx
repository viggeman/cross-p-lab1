interface ListProps {
  instructions: string
}

const InstructionItem: React.FC<ListProps> = (instruction) => {
  return (
    <>
        {instruction.map((item, index) => (
          <li key={index}>{item}</li>
        ))}

    </>
  )
}

export default InstructionItem;
