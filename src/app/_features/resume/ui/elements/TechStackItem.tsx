interface TechStackItemProps {
  title: string;
  description: string;
}

const TechStackItem = ({ title, description }: TechStackItemProps) => {
  return (
    <div className="flex flex-col">
      <div className="text-xl lg:text-2xl font-regular">{title}</div>
      <ul className="text-xl lg:text-2xl font-light list-disc pl-8 mt-2">
        <li>{description}</li>
      </ul>
    </div>
  );
};

export { TechStackItem };
