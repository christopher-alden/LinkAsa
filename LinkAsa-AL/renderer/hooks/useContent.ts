import { useEffect, useState } from "react";
import { getAccessibleContent } from "../services/roleAuthorize";
import { UserRole } from "../model/userAttributes";

export const useContent = (userRole: UserRole) => {
    
    const accessibleContentObjects = getAccessibleContent(userRole);
    const accessibleContent = accessibleContentObjects.flatMap(obj => obj.items);

    const firstContent = accessibleContentObjects.length > 0 ? accessibleContentObjects[0].items[0]: null;

    useEffect(() => {
        setContent(firstContent);
    }, [firstContent]); 

    const [content, setContent] = useState<string>(firstContent);

    const switchContent = (newContent: string) => {
        if (accessibleContent.includes(newContent)) {
            setContent(newContent);
        } else {
            console.error("Unauthorized access attempted.");
        }
    };

    return { content, switchContent, accessibleContentObjects };
};
