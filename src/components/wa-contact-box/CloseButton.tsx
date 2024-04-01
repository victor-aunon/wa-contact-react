type CloseButtonProps = React.ComponentPropsWithRef<"svg"> & {
  title: string
}

export function CloseButton({title, ...props} : CloseButtonProps) {
  return (
    <svg
      width="800px"
      height="800px"
      viewBox="2 2 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>{title}</title>
      <path
        d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
        stroke="#FFFFFF"
        strokeWidth="2"
      />
      <path
        d="M9 9L15 15M15 9L9 15"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
