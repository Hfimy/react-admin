#注意：此.sh文件应位于react-admin项目的同级目录，而不是该项目下
#路径
SRC_PATH=/f/project/
DIST_PATH=/f/deploy

#检查是否传入参数
if [ ! -n "$1" ];
then 
    echo -e "Please input a project name! You can input as follows:"
    echo -e "./deploy.sh react-admin"
    exit
fi

#检查传入项目名是否正确
if [ $1 = "react-admin" ]
then   
    echo -e "-----Enter Project-----"
    cd $SRC_PATH$1
else
    echo -e "-----Invalid Project Name-----"
    exit
fi

#clean src dist
rm -rf ./dist
git pull
yarn
yarn run build

#替换部署文件夹下的文件
if [ -d "./dist" ];
then
    echo -e "-----clean dist-----"
    rm -rf $DIST_PATH/dist
    cp -R ./dist $DIST_PATH/$1
    echo -e "-----Deploy Success-----"
else
    echo -e "-----Deploy Fail-----"
fi
