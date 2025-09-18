import { Card, CardContent } from "@/components/ui/card";
import fotImg from "../../../public/doutora-2.jpg";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Professionals(){
    return(
        <div className="bg-gray-50 py-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-center text-3xl mb-6 font-bold tracking-wide">Professionals Page</h2>
            </div>
            <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:px-10 lg:grid-cols-4 xl:grid-cols-5">
                <Card className="overflow-hidden">
                    <CardContent>
                        <div>
                            <div className="relative h-48 flex flex-col rounded-t-xl">
                                <Image 
                                    src={fotImg.src} 
                                    alt="foto perfil"
                                    fill
                                    className="object-cover rounded-t-xl" 
                                />
                            </div>
                        </div>
                        <div className="p-4 space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-semibold">Clinica Centro</h3>
                                    <p className="text-gray-500">Rua Brasil, N.512 - GO</p>
                                </div>
                                <div className="w-3.5 h-3.5 rounded-full bg-emerald-500"></div>
                            </div>
                            <Link href="#" className=" w-full flex bg-emerald-500 hover:bg-emerald-400 text-white flex-center 
                                justify-center font-bold py-2 px-4 rounded-md
                            "> <span className="text-sm tracking-wider">Agendar Horário</span>
                                <ArrowRight className="ml-2" />
                            </Link>   
                        </div>
                    </CardContent>
                </Card>

                <Card className="overflow-hidden">
                    <CardContent>
                        <div>
                            <div className="relative h-48 flex flex-col rounded-t-xl">
                                <Image 
                                    src={fotImg.src} 
                                    alt="foto perfil"
                                    fill
                                    className="object-cover rounded-t-xl" 
                                />
                            </div>
                        </div>
                        <div className="p-4 space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-semibold">Clinica Centro</h3>
                                    <p className="text-gray-500">Rua Brasil, N.512 - GO</p>
                                </div>
                                <div className="w-3.5 h-3.5 rounded-full bg-emerald-500"></div>
                            </div>
                            <Link href="#" className=" w-full flex bg-emerald-500 hover:bg-emerald-400 text-white flex-center 
                                justify-center font-bold py-2 px-4 rounded-md
                            "> <span className="text-sm tracking-wider">Agendar Horário</span>
                                <ArrowRight className="ml-2" />
                            </Link>   
                        </div>
                    </CardContent>
                </Card>

                <Card className="overflow-hidden">
                    <CardContent>
                        <div>
                            <div className="relative h-48 flex flex-col rounded-t-xl">
                                <Image 
                                    src={fotImg.src} 
                                    alt="foto perfil"
                                    fill
                                    className="object-cover rounded-t-xl" 
                                />
                            </div>
                        </div>
                        <div className="p-4 space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-semibold">Clinica Centro</h3>
                                    <p className="text-gray-500">Rua Brasil, N.512 - GO</p>
                                </div>
                                <div className="w-3.5 h-3.5 rounded-full bg-emerald-500"></div>
                            </div>
                            <Link href="#" className=" w-full flex bg-emerald-500 hover:bg-emerald-400 text-white flex-center 
                                justify-center font-bold py-2 px-4 rounded-md
                            "> <span className="text-sm tracking-wider">Agendar Horário</span>
                                <ArrowRight className="ml-2" />
                            </Link>   
                        </div>
                    </CardContent>
                </Card>

                <Card className="overflow-hidden">
                    <CardContent>
                        <div>
                            <div className="relative h-48 flex flex-col rounded-t-xl">
                                <Image 
                                    src={fotImg.src} 
                                    alt="foto perfil"
                                    fill
                                    className="object-cover rounded-t-xl" 
                                />
                            </div>
                        </div>
                        <div className="p-4 space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-semibold">Clinica Centro</h3>
                                    <p className="text-gray-500">Rua Brasil, N.512 - GO</p>
                                </div>
                                <div className="w-3.5 h-3.5 rounded-full bg-emerald-500"></div>
                            </div>
                            <Link href="#" className=" w-full flex bg-emerald-500 hover:bg-emerald-400 text-white flex-center 
                                justify-center font-bold py-2 px-4 rounded-md
                            "> <span className="text-sm tracking-wider">Agendar Horário</span>
                                <ArrowRight className="ml-2" />
                            </Link>   
                        </div>
                    </CardContent>
                </Card>

                <Card className="overflow-hidden">
                    <CardContent>
                        <div>
                            <div className="relative h-48 flex flex-col rounded-t-xl">
                                <Image 
                                    src={fotImg.src} 
                                    alt="foto perfil"
                                    fill
                                    className="object-cover rounded-t-xl" 
                                />
                            </div>
                        </div>
                        <div className="p-4 space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-semibold">Clinica Centro</h3>
                                    <p className="text-gray-500">Rua Brasil, N.512 - GO</p>
                                </div>
                                <div className="w-3.5 h-3.5 rounded-full bg-emerald-500"></div>
                            </div>
                            <Link href="#" className=" w-full flex bg-emerald-500 hover:bg-emerald-400 text-white flex-center 
                                justify-center font-bold py-2 px-4 rounded-md
                            "> <span className="text-sm tracking-wider">Agendar Horário</span>
                                <ArrowRight className="ml-2" />
                            </Link>   
                        </div>
                    </CardContent>
                </Card>

                

            </section>
        </div>
    )
}