import { Flex, ButtonGroup, Link, Img, Spacer } from "@chakra-ui/react";

export function BottomBar() {
    return (
        <Flex
            w="100%" // Stretch the entire width of its parent
            flexDirection="row"
            justifyContent="space-between"
        >
            <ButtonGroup p={4} flexDirection="row">
                <Link  
                mr={4}
                alignContent="center"
                href="https://twitter.com/CantoPublic/">
                    <Img src="/twitter.png" alt="Twitter" boxSize="24px" />
                </Link>
                <Link 
                mr={4}
                alignContent="center"
                href="https://github.com/Canto-Network">
                    <Img src="/github.png" alt="GitHub" boxSize="24px" />
                </Link>
                <Link 
                alignContent="center"
                href="https://canto.io/">
                    <Img src="/canto.png" alt="Canto" boxSize="24px" />
                </Link>
            </ButtonGroup>

            <Spacer />

            <Flex flexDirection="row" alignItems="center">
             
            </Flex>
        </Flex>
    )
}