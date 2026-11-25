#!/usr/bin/env python3
"""
测试优化后的推荐问题生成功能
"""
import sys
from pathlib import Path

# 添加项目根目录到Python路径
sys.path.append(str(Path(__file__).parent))

def test_simple_questions():
    """测试简化后的推荐问题生成"""
    try:
        from service.core.chat import generate_recommended_questions
        
        print("🧪 测试1: 纯问题扩展（无文档）")
        questions1 = generate_recommended_questions("延安精神的核心内涵是什么？")
        print(f"生成结果: {questions1}")

        print("\n🧪 测试2: 有文档上下文")
        mock_content = [
            {"document_name": "延安精神学习资料.pdf", "content_with_weight": "..."},
            {"document_name": "南泥湾大生产运动.docx", "content_with_weight": "..."}
        ]
        questions2 = generate_recommended_questions("延安精神的核心内涵是什么？", mock_content)
        print(f"生成结果: {questions2}")
        
        return True
        
    except Exception as e:
        print(f"❌ 测试失败: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    success = test_simple_questions()
    print(f"\n{'✅ 测试通过' if success else '❌ 测试失败'}") 