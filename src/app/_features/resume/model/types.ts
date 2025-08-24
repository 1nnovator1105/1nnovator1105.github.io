export type DescriptionListItemType =
  | {
      item: string;
      subItems?: string[];
      link?: string;
    }
  | string;

export type TaskSectionItemType = {
  title: string;
  techStacks?: string[];
  link?: string;
  period?: string;
  descriptionList: DescriptionListItemType[];
};

export type TaskSectionType = {
  section: string;
  items: TaskSectionItemType[];
};
