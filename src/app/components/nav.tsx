export default function Header() {
    return (
        <div className="w-full sticky top-0 py-6 bg-[#334155] flex items-center">
            <div className="text-end flex-1">
                <div className="font-bold text-2xl">GalantAI</div>
            </div>
            <div className="flex-1 text-end px-6">
                <select name="" id="">
                    <option value="GPT-4o"></option>
                    <option value="GPT-4o-mini"></option>
                    <option value="Grok"></option>
                </select>
            </div>
        </div>
    )
}