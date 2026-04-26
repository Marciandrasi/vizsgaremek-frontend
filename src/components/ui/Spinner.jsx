export default function Spinner() {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="w-10 h-10 border-4 border-t-transparent rounded-full animate-spin" style={{borderColor: 'rgba(168,85,247,0.3)', borderTopColor: 'transparent', borderRightColor: '#a855f7'}}></div>
    </div>
  );
}
