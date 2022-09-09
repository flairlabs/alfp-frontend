import { useState, useRef } from "react"

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const MobileNavItem = ({item, idx}) => {
  let topLinkNormal = "text-gray-600 hover:bg-accent-1"
  let topLinkHover = "bg-accent-1 text-gray-800"

  const [isActive, setIsActive] = useState(false);
  const childElem = useRef(null);

  const toggleCollapse = () => {
    setIsActive(current => !current);
    console.dir(childElem.current);
  }

  return (
    <>
      <span key={"span-" + item.name} onClick={toggleCollapse}>
          <a
              key={"mobileDisclosureItem-" + item.name}
              href={item.href}
              className={classNames(
                  global.currentSection === item.slug ? topLinkHover : topLinkNormal,
                  'block px-3 py-2 font-bold border-b border-accent-8'
              )}
              aria-current={item.current ? 'page' : undefined}
          >
              {item.name}
              
          </a>
          
          {/* Check if active to add Max height based on the element's scrollHeight */}
          
         <div className={classNames(
            'ml-3 overflow-hidden transition-all duration-300 ease-in-out'
            )} 
            style={{maxHeight: isActive ? `${childElem.current.scrollHeight}px` : '0'}}
            ref={childElem}
         >
         {item.children && item.children.map((child) => (
              <div 
                key={"mobileDisclosureChildDiv-" + child.name}
                ref={childElem}
               >
                  <a
                      key={"mobileDisclosureChildLink-" + child.name}
                      href={child.href}
                      className='block px-3 ml-2 py-2 text-base font-medium'
                  >
                      {child.name}
                  </a>
                  {child.children && child.children.map((subchild) => (
                      <a
                          key={"mobileDisclosureSubChildLink-" + subchild.name}
                          href={subchild.href}
                          className='block px-3 ml-5 pl-5 py-2 text-base font-medium'
                      >
                          {subchild.name}
                      </a>
                  ))}
              </div>
          ))}
         </div>
      </span>
    </>
  );
}

export default MobileNavItem;