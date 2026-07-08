interface TechStackItemProps {
  title: string;
  description: string;
}

const TechStackItem = ({ title, description }: TechStackItemProps) => {
  return (
    <div className="group flex flex-col transition-transform duration-200 hover:translate-x-1">
      <div className="text-xl lg:text-2xl font-regular transition-colors duration-200 group-hover:text-orange-600">
        {title}
      </div>
      <ul className="text-xl lg:text-2xl font-light list-disc pl-8 mt-2">
        <li>{description}</li>
      </ul>
    </div>
  );
};

export { TechStackItem };
