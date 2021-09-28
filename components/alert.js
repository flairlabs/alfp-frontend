import Container from './container'
import cn from 'classnames'
import {EXAMPLE_PATH} from '../lib/constants'

export default function Alert({preview}) {
    return (
        <div
            className={cn('border-b', {
                'bg-accent-7 border-accent-7 text-white': preview,
                'bg-accent-1 border-accent-2': !preview,
            })}
        >
            <Container>
                <div className="text-center text-sm">
                    {preview ? (
                        <>
                            This is a page preview.{' '}
                            <a
                                href="/api/exit-preview"
                                className="underline hover:text-cyan duration-200 transition-colors"
                            >
                                Click here
                            </a>{' '}
                            to exit preview mode.
                        </>
                    ) : (
                        <>
                            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                                <div className="relative flex items-center justify-between h-16">
                                    <ul className="flex">
                                        <li className="mr-6">
                                            <a href="/">Home</a>
                                        </li>
                                        <li className="mr-6">
                                            <a href="#">Mutual Funds</a>
                                        </li>
                                        <li className="mr-6">
                                            <a href="/about">About ALFM</a>
                                        </li>
                                        <li className="mr-6">
                                            <a href="#">Related Sites</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </Container>
        </div>
    )
}
